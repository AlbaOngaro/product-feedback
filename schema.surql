-- ------------------------------
-- OPTION
-- ------------------------------

OPTION IMPORT;

-- ------------------------------
-- SCOPES
-- ------------------------------

DEFINE SCOPE allusers SESSION 2w SIGNUP (CREATE user SET settings.marketing = $marketing, user = $user, pass = crypto::argon2::generate($pass), tags = $tags) SIGNIN (SELECT * FROM user WHERE user = $user AND crypto::argon2::compare(pass, $pass));

-- ------------------------------
-- TABLE: category
-- ------------------------------

DEFINE TABLE category SCHEMALESS PERMISSIONS FOR select, create, update, delete WHERE true;

-- ------------------------------
-- TABLE: comment
-- ------------------------------

DEFINE TABLE comment SCHEMALESS PERMISSIONS FOR select, create, update, delete WHERE true;

-- ------------------------------
-- TABLE: comments
-- ------------------------------

DEFINE TABLE comments SCHEMALESS PERMISSIONS FOR select, create, update, delete WHERE true;

-- ------------------------------
-- TABLE: parent
-- ------------------------------

DEFINE TABLE parent SCHEMALESS PERMISSIONS FOR select, create, update, delete WHERE true;

-- ------------------------------
-- TABLE: suggestion
-- ------------------------------

DEFINE TABLE suggestion SCHEMALESS PERMISSIONS FOR select, create, update, delete WHERE true;

-- ------------------------------
-- TABLE: user
-- ------------------------------

DEFINE TABLE user SCHEMAFULL PERMISSIONS FOR select, update WHERE id = $auth.id, FOR create, delete NONE;

DEFINE FIELD pass ON user TYPE string;
DEFINE FIELD settings.marketing ON user TYPE string;
DEFINE FIELD settings[*] ON user TYPE object;
DEFINE FIELD tags ON user TYPE array;
DEFINE FIELD user ON user TYPE string;

DEFINE INDEX idx_user ON user FIELDS user UNIQUE;

-- ------------------------------
-- TRANSACTION
-- ------------------------------

BEGIN TRANSACTION;

-- ------------------------------
-- TABLE DATA: category
-- ------------------------------

UPDATE category:bug CONTENT { id: category:bug, label: 'Bug' };
UPDATE category:enhancement CONTENT { id: category:enhancement, label: 'Enhancement' };
UPDATE category:feature CONTENT { id: category:feature, label: 'Feature' };
UPDATE category:ui CONTENT { id: category:ui, label: 'UI' };
UPDATE category:ux CONTENT { id: category:ux, label: 'UX' };

-- ------------------------------
-- TABLE DATA: comment
-- ------------------------------

UPDATE comment:tug9neipdabi6upmv0b6 CONTENT { author: user:ciyjozwip2aqwxqw3m3p, contents: 'Rump brisket ball tip, corned beef t-bone porchetta sirloin ribeye capicola tail doner pork loin venison andouille.', id: comment:tug9neipdabi6upmv0b6, parentId: NULL };

-- ------------------------------
-- TABLE DATA: comments
-- ------------------------------

RELATE suggestion:bzlikovwcsy8fqfgxu3y -> comments:kvx7nl6jdr8kxde163te -> comment:tug9neipdabi6upmv0b6 CONTENT { __: true, id: comments:kvx7nl6jdr8kxde163te, in: suggestion:bzlikovwcsy8fqfgxu3y, out: comment:tug9neipdabi6upmv0b6 };

-- ------------------------------
-- TABLE DATA: parent
-- ------------------------------


-- ------------------------------
-- TABLE DATA: suggestion
-- ------------------------------

UPDATE suggestion:bzlikovwcsy8fqfgxu3y CONTENT { category: category:bug, comments: [], description: 'Bacon ipsum dolor amet turducken frankfurter salami, pork short loin ground round hamburger venison. Pastrami pork chop tri-tip, shoulder ball tip capicola short ribs. Jowl prosciutto tongue, pork loin spare ribs alcatra short ribs ham cow hamburger. Bacon jerky pork chop leberkas, beef turducken corned beef capicola rump boudin chislic ribeye burgdoggen t-bone. Sausage kielbasa ribeye shank chuck short ribs pork. Porchetta chislic capicola frankfurter strip steak shank tail cow cupim turducken bacon. Corned beef pork chop tenderloin picanha pork loin.', id: suggestion:bzlikovwcsy8fqfgxu3y, state: 'Planned', title: 'A demo on prod', votes: [{ id: user:ciyjozwip2aqwxqw3m3p, pass: '$argon2id$v=19$m=19456,t=2,p=1$59eRzAQy/1zWzl9oy/JeFQ$j7U1g0qsvGCWeBvO8wKc5wE68Je1TSo1KQ2E1O/VvPY', user: 'alba.ongaro@outlook.com' }] };

-- ------------------------------
-- TABLE DATA: user
-- ------------------------------

UPDATE user:ciyjozwip2aqwxqw3m3p CONTENT { id: user:ciyjozwip2aqwxqw3m3p, pass: '$argon2id$v=19$m=19456,t=2,p=1$59eRzAQy/1zWzl9oy/JeFQ$j7U1g0qsvGCWeBvO8wKc5wE68Je1TSo1KQ2E1O/VvPY', user: 'alba.ongaro@outlook.com' };

-- ------------------------------
-- TRANSACTION
-- ------------------------------

COMMIT TRANSACTION;

