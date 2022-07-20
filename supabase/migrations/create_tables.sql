CREATE TABLE feed(title text, url text PRIMARY KEY);
CREATE TABLE article(title text, description text, link text PRIMARY KEY, published timestamptz, read bool);
