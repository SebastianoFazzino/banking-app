-- Create table for clients
CREATE TABLE IF NOT EXISTS clients (
    personal_code VARCHAR(255) NOT NULL PRIMARY KEY,
    segmentation VARCHAR(255),
    credit_modifier INT NULL
);

-- Insert statements for clients
INSERT INTO clients (personal_code, segmentation, credit_modifier) VALUES
 ('49002010965', 'DEBT', NULL),
 ('49002010976', 'SEGMENT_ONE', 100),
 ('49002010987', 'SEGMENT_TWO', 300),
 ('49002010998', 'SEGMENT_THREE', 1000);

