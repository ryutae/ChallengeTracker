CREATE TABLE challenges (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    group_id INTEGER REFERENCES groups(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    points INTEGER NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL
);