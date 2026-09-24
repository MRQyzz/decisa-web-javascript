BEGIN;

DELETE FROM "sessions"
WHERE "user_id" IN (
  SELECT "id"
  FROM "users"
  WHERE "email" IN (
    'qytest2@example.com',
    'dev@decisa.local',
    'qytransaction@example.com'
  )
);

DELETE FROM "tasks"
WHERE "user_id" IN (
  SELECT "id"
  FROM "users"
  WHERE "email" IN (
    'qytest2@example.com',
    'dev@decisa.local',
    'qytransaction@example.com'
  )
);

DELETE FROM "goals"
WHERE "user_id" IN (
  SELECT "id"
  FROM "users"
  WHERE "email" IN (
    'qytest2@example.com',
    'dev@decisa.local',
    'qytransaction@example.com'
  )
);

DELETE FROM "plans"
WHERE "user_id" IN (
  SELECT "id"
  FROM "users"
  WHERE "email" IN (
    'qytest2@example.com',
    'dev@decisa.local',
    'qytransaction@example.com'
  )
);

DELETE FROM "user_settings"
WHERE "user_id" IN (
  SELECT "id"
  FROM "users"
  WHERE "email" IN (
    'qytest2@example.com',
    'dev@decisa.local',
    'qytransaction@example.com'
  )
);

DELETE FROM "users"
WHERE "email" IN (
  'qytest2@example.com',
  'dev@decisa.local',
  'qytransaction@example.com'
);

COMMIT;