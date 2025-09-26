DO $do$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'auth') THEN
    -- Drop existing triggers if they exist
    DROP TRIGGER IF EXISTS set_supabase_id ON auth.users;
    DROP TRIGGER IF EXISTS delete_supabase_id ON auth.users;

    -- Create or replace function for setting supabaseId
    CREATE OR REPLACE FUNCTION update_supabase_id()
    RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $update_supabase_id$
    BEGIN
      UPDATE public."User"
      SET "supabaseId" = NEW.id
      WHERE "email" = NEW.email;

      RETURN NEW;
    END;
    $update_supabase_id$;

    -- Create or replace function for deleting supabaseId
    CREATE OR REPLACE FUNCTION delete_supabase_id()
    RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    AS $delete_supabase_id$
    BEGIN
      UPDATE public."User"
      SET "supabaseId" = NULL
      WHERE "email" = NEW.email;

      RETURN NEW;
    END;
    $delete_supabase_id$;

    -- Create triggers
    CREATE TRIGGER set_supabase_id
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION update_supabase_id();

    CREATE TRIGGER delete_supabase_id
    AFTER DELETE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION delete_supabase_id();
  END IF;
END
$do$;