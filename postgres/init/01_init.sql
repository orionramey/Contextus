-- Initial PostgreSQL Setup
-- "Where truth lives in tables"

-- Create a database for our applications
CREATE DATABASE IF NOT EXISTS contextus_app;

-- Create a metrics schema for time-series data
\c contextus_app;

CREATE SCHEMA IF NOT EXISTS metrics;
CREATE SCHEMA IF NOT EXISTS app;

-- Create a sample table for tracking learning progress
CREATE TABLE IF NOT EXISTS app.learning_progress (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    skill VARCHAR(100) NOT NULL,
    progress_percentage INTEGER CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Create a table for project tracking
CREATE TABLE IF NOT EXISTS app.projects (
    id SERIAL PRIMARY KEY,
    project_name VARCHAR(200) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'planning',
    github_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Create a table for daily reflections (inspired by engineering journey)
CREATE TABLE IF NOT EXISTS app.reflections (
    id SERIAL PRIMARY KEY,
    reflection_date DATE DEFAULT CURRENT_DATE,
    what_i_learned TEXT,
    what_challenged_me TEXT,
    tomorrow_goals TEXT,
    thumos_level INTEGER CHECK (thumos_level >= 1 AND thumos_level <= 10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO app.learning_progress (user_name, skill, progress_percentage, notes) VALUES
('New Engineer', 'Docker Basics', 75, 'Completed docker-compose tutorial'),
('New Engineer', 'PromQL', 30, 'Learning basic queries'),
('New Engineer', 'Grafana Dashboards', 50, 'Created first custom dashboard');

-- Create indexes for better performance
CREATE INDEX idx_learning_user ON app.learning_progress(user_name);
CREATE INDEX idx_projects_status ON app.projects(status);
CREATE INDEX idx_reflections_date ON app.reflections(reflection_date);

-- Grant permissions (for future multi-user scenarios)
GRANT ALL PRIVILEGES ON SCHEMA app TO postgres;
GRANT ALL PRIVILEGES ON SCHEMA metrics TO postgres;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Contextus database initialized successfully!';
    RAISE NOTICE 'Remember: Every master was once a disaster.';
END $$;