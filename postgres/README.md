# 🐘 PostgreSQL - Where Truth Lives in Tables

> "Data is the new oil, but PostgreSQL is the refinery."

Welcome to the foundation of your data persistence layer. PostgreSQL isn't just a database—it's where your applications store their memories, their state, and their truth.

## 🎯 Why PostgreSQL?

In the military, you trusted your battle buddy. In engineering, PostgreSQL is that buddy:
- **Battle-tested** - 30+ years of reliability
- **ACID compliant** - Your data is sacred
- **Extensible** - Grows with your needs
- **Open source** - No vendor lock-in

## 📁 Directory Structure

```
postgres/
├── init/                   # Initialization scripts
│   └── 01_init.sql        # Database setup
└── README.md              # You are here
```

## 🚀 Initialization Scripts

### How It Works

Files in `init/` run automatically when PostgreSQL first starts:
1. Scripts execute in alphabetical order
2. Only runs on fresh database (empty data volume)
3. Perfect for schema creation and seed data

### Current Schema (01_init.sql)

Our database tracks your engineering journey:

#### 📊 Tables Overview

**learning_progress**
```sql
CREATE TABLE app.learning_progress (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100),
    skill VARCHAR(100),
    progress_percentage INTEGER,
    last_updated TIMESTAMP,
    notes TEXT
);
```
*Your personal skill tracker - watch yourself level up!*

**projects**
```sql
CREATE TABLE app.projects (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(200),
    description TEXT,
    status VARCHAR(50),
    github_url VARCHAR(500),
    created_at TIMESTAMP,
    completed_at TIMESTAMP
);
```
*Your portfolio builder - every project tells a story*

**reflections**
```sql
CREATE TABLE app.reflections (
    id SERIAL PRIMARY KEY,
    reflection_date DATE,
    what_i_learned TEXT,
    what_challenged_me TEXT,
    tomorrow_goals TEXT,
    thumos_level INTEGER,
    created_at TIMESTAMP
);
```
*Your engineering diary - inspired by the philosophy of growth*

## 🔍 Connecting to PostgreSQL

### Via Docker
```bash
# Direct connection
docker exec -it contextus-postgres psql -U postgres

# With specific database
docker exec -it contextus-postgres psql -U postgres -d contextus_app
```

### Via Local psql
```bash
# If you have psql installed locally
psql -h localhost -p 5432 -U postgres -d contextus_app
# Password: mysecret
```

### Via VS Code
1. Install PostgreSQL extension
2. Add connection:
   - Host: localhost
   - Port: 5432
   - Username: postgres
   - Password: mysecret
   - Database: contextus_app

## 📚 Essential SQL for Engineers

### Your First Queries

**Track your learning:**
```sql
-- Add a new skill
INSERT INTO app.learning_progress (user_name, skill, progress_percentage, notes)
VALUES ('Your Name', 'Docker', 75, 'Completed docker-compose tutorial');

-- View your progress
SELECT skill, progress_percentage, notes 
FROM app.learning_progress 
WHERE user_name = 'Your Name'
ORDER BY progress_percentage DESC;
```

**Document your projects:**
```sql
-- Add a project
INSERT INTO app.projects (project_name, description, status, github_url)
VALUES (
    'Contextus Setup',
    'My private monitoring stack',
    'in_progress',
    'https://github.com/yourusername/contextus'
);

-- View active projects
SELECT project_name, status, created_at
FROM app.projects
WHERE status != 'completed'
ORDER BY created_at DESC;
```

**Daily reflections:**
```sql
-- Today's reflection
INSERT INTO app.reflections (
    what_i_learned,
    what_challenged_me,
    tomorrow_goals,
    thumos_level
) VALUES (
    'PromQL basics and Grafana dashboards',
    'Understanding time-series data',
    'Build custom alerts',
    8
);

-- View your journey
SELECT reflection_date, thumos_level, what_i_learned
FROM app.reflections
ORDER BY reflection_date DESC
LIMIT 7;
```

### Power User Queries

**Learning velocity:**
```sql
-- Skills learned per week
SELECT 
    DATE_TRUNC('week', last_updated) as week,
    COUNT(DISTINCT skill) as skills_touched,
    AVG(progress_percentage) as avg_progress
FROM app.learning_progress
GROUP BY week
ORDER BY week DESC;
```

**Project completion rate:**
```sql
-- Success metrics
SELECT 
    COUNT(*) FILTER (WHERE status = 'completed') as completed,
    COUNT(*) FILTER (WHERE status = 'abandoned') as abandoned,
    COUNT(*) FILTER (WHERE status = 'in_progress') as active,
    ROUND(
        COUNT(*) FILTER (WHERE status = 'completed')::numeric / 
        COUNT(*)::numeric * 100, 2
    ) as completion_rate
FROM app.projects;
```

**Thumos tracker:**
```sql
-- Your fire over time
SELECT 
    reflection_date,
    thumos_level,
    AVG(thumos_level) OVER (
        ORDER BY reflection_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) as rolling_avg
FROM app.reflections
ORDER BY reflection_date DESC;
```

## 🛠️ Database Administration

### Backup Your Journey
```bash
# Backup entire database
docker exec contextus-postgres pg_dump -U postgres contextus_app > backup_$(date +%Y%m%d).sql

# Backup specific table
docker exec contextus-postgres pg_dump -U postgres -t app.projects contextus_app > projects_backup.sql
```

### Restore From Backup
```bash
# Restore entire database
docker exec -i contextus-postgres psql -U postgres contextus_app < backup_20240101.sql

# Restore specific table
docker exec -i contextus-postgres psql -U postgres contextus_app < projects_backup.sql
```

### Monitor Database Health
```sql
-- Database size
SELECT pg_database_size('contextus_app') / 1024 / 1024 as size_mb;

-- Table sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'app'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Active connections
SELECT count(*) FROM pg_stat_activity;

-- Long running queries
SELECT 
    pid,
    now() - pg_stat_activity.query_start AS duration,
    query
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';
```

## 🎓 Learning Exercises

### Exercise 1: Create Your Schema
Add a new table for tracking books:
```sql
CREATE TABLE app.reading_list (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    author VARCHAR(200),
    status VARCHAR(50) DEFAULT 'to_read',
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    notes TEXT,
    date_completed DATE
);
```

### Exercise 2: Write a View
Create a dashboard view:
```sql
CREATE VIEW app.learning_dashboard AS
SELECT 
    u.skill,
    u.progress_percentage,
    COUNT(p.id) as related_projects,
    MAX(r.thumos_level) as peak_thumos
FROM app.learning_progress u
LEFT JOIN app.projects p ON p.description LIKE '%' || u.skill || '%'
LEFT JOIN app.reflections r ON r.what_i_learned LIKE '%' || u.skill || '%'
GROUP BY u.skill, u.progress_percentage;
```

### Exercise 3: Add Constraints
Ensure data integrity:
```sql
-- Prevent duplicate skills per user
ALTER TABLE app.learning_progress 
ADD CONSTRAINT unique_user_skill UNIQUE(user_name, skill);

-- Ensure valid status
ALTER TABLE app.projects
ADD CONSTRAINT valid_status CHECK (
    status IN ('planning', 'in_progress', 'completed', 'on_hold', 'abandoned')
);
```

## 🔐 Security Best Practices

### Development vs Production

**Current setup (Development):**
- Simple password ('mysecret')
- Open port (5432)
- Basic authentication

**Production recommendations:**
- Use environment variables for credentials
- Enable SSL/TLS
- Implement connection pooling
- Regular security updates
- Automated backups

### User Management
```sql
-- Create a read-only user
CREATE USER grafana_reader WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE contextus_app TO grafana_reader;
GRANT USAGE ON SCHEMA app TO grafana_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA app TO grafana_reader;

-- Create an app user with limited permissions
CREATE USER app_user WITH PASSWORD 'another_secure_password';
GRANT CONNECT ON DATABASE contextus_app TO app_user;
GRANT USAGE ON SCHEMA app TO app_user;
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA app TO app_user;
```

## 📊 Integration with Prometheus

PostgreSQL metrics are exposed via postgres-exporter:

**Key metrics to monitor:**
- `pg_up` - Is PostgreSQL running?
- `pg_database_size_bytes` - Database size
- `pg_stat_user_tables_n_tup_ins` - Insert rate
- `pg_stat_database_numbackends` - Active connections

**Example Grafana queries:**
```promql
# Database size growth
rate(pg_database_size_bytes[1h])

# Query rate
rate(pg_stat_database_tup_fetched[5m])

# Connection saturation
pg_stat_database_numbackends / pg_settings_max_connections
```

## 🚀 Advanced Topics

### JSON Support
PostgreSQL speaks JSON fluently:
```sql
-- Store configuration as JSON
ALTER TABLE app.projects ADD COLUMN config JSONB;

UPDATE app.projects 
SET config = '{"language": "Go", "framework": "Gin", "deployment": "Docker"}'::jsonb
WHERE project_name = 'API Server';

-- Query JSON data
SELECT project_name, config->>'language' as language
FROM app.projects
WHERE config->>'deployment' = 'Docker';
```

### Full-Text Search
Built-in search capabilities:
```sql
-- Add search to reflections
ALTER TABLE app.reflections 
ADD COLUMN search_vector tsvector;

UPDATE app.reflections 
SET search_vector = to_tsvector('english', 
    coalesce(what_i_learned, '') || ' ' || 
    coalesce(what_challenged_me, '')
);

-- Search your thoughts
SELECT reflection_date, what_i_learned
FROM app.reflections
WHERE search_vector @@ plainto_tsquery('english', 'docker prometheus');
```

### Time-Series with TimescaleDB
Transform PostgreSQL into a time-series powerhouse:
```sql
-- Future enhancement for metrics storage
CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TABLE metrics.system_metrics (
    time TIMESTAMPTZ NOT NULL,
    metric_name TEXT NOT NULL,
    value DOUBLE PRECISION,
    labels JSONB
);

SELECT create_hypertable('metrics.system_metrics', 'time');
```

## 💡 Pro Tips

1. **Use transactions** for related changes
2. **Index foreign keys** for performance
3. **EXPLAIN ANALYZE** your slow queries
4. **VACUUM** regularly (automated in Docker)
5. **Monitor bloat** in busy tables

## 🎭 The Philosophy of Data

Your database is more than storage—it's a reflection of your journey:
- Every row tells a story
- Every query seeks truth
- Every backup preserves history
- Every index accelerates discovery

Treat your data with respect, and it will serve you faithfully.

---

> "The data may not contain the answer. The combination of some data and an aching desire for an answer does not ensure that a reasonable answer can be extracted from a given body of data." - John Tukey

Master your data, and you master your destiny.