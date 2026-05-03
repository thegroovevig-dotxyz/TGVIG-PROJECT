import express from "express";
import { exec } from "child_process";
import path from "path";
import fs from "fs";

const router = express.Router();

// Backup directory
const BACKUP_DIR = path.join(process.cwd(), "backups");

// Ensure backup folder exists
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

// POST /api/admin/backup
router.post("/backup", async (req, res) => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `backup-${timestamp}.zip`;
    const filepath = path.join(BACKUP_DIR, filename);

    // PostgreSQL dump
    const pgDump = `pg_dump -U postgres -h localhost -F c tgvigdb > ${BACKUP_DIR}/pg_backup-${timestamp}.sql`;
    // MongoDB dump
    const mongoDump = `mongodump --db tgvig_mongo --out ${BACKUP_DIR}/mongo_backup-${timestamp}`;

    // Execute both dumps sequentially
    exec(`${pgDump} && ${mongoDump}`, (error, stdout, stderr) => {
      if (error) {
        console.error("Backup error:", stderr);
        return res.status(500).json({ error: stderr });
      }

      // Zip all backup files
      const zipCmd = `zip -r ${filepath} ${BACKUP_DIR}/pg_backup-${timestamp}.sql ${BACKUP_DIR}/mongo_backup-${timestamp}`;
      exec(zipCmd, (zipErr) => {
        if (zipErr) return res.status(500).json({ error: zipErr.message });

        // Delete unzipped files to keep only archive
        fs.unlinkSync(`${BACKUP_DIR}/pg_backup-${timestamp}.sql`);
        fs.rmSync(`${BACKUP_DIR}/mongo_backup-${timestamp}`, { recursive: true, force: true });

        return res.json({ message: "Backup successful", filename });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/restore
router.post("/restore", async (req, res) => {
  try {
    // Use the latest backup
    const files = fs.readdirSync(BACKUP_DIR).filter(f => f.endsWith(".zip"));
    if (!files.length) return res.status(400).json({ error: "No backups found" });

    const latestBackup = files.sort().reverse()[0];
    const backupPath = path.join(BACKUP_DIR, latestBackup);

    // Unzip
    exec(`unzip -o ${backupPath} -d ${BACKUP_DIR}`, (unzipErr) => {
      if (unzipErr) return res.status(500).json({ error: unzipErr.message });

      // Restore PostgreSQL
      const pgFile = fs.readdirSync(BACKUP_DIR).find(f => f.startsWith("pg_backup"));
      const pgRestore = `psql -U postgres -d tgvigdb -f ${path.join(BACKUP_DIR, pgFile)}`;

      // Restore MongoDB
      const mongoDir = fs.readdirSync(BACKUP_DIR).find(d => d.startsWith("mongo_backup"));
      const mongoRestore = `mongorestore --drop --db tgvig_mongo ${path.join(BACKUP_DIR, mongoDir, "tgvig_mongo")}`;

      exec(`${pgRestore} && ${mongoRestore}`, (restoreErr) => {
        if (restoreErr) return res.status(500).json({ error: restoreErr.message });

        return res.json({ message: "Restore completed successfully" });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;