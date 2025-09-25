DROP TRIGGER IF EXISTS set_supabase_id ON auth.users;
DROP TRIGGER IF EXISTS delete_supabase_id ON auth.users;


CREATE OR REPLACE FUNCTION update_supabase_id()
returns trigger
language plpgsql
as $$
begin
  update public."user" set "supabaseId" = new.id where "email" = new.email;

  RETURN NEW;
end;
$$;


CREATE OR REPLACE FUNCTION delete_supabase_id()
returns trigger
language plpgsql
as $$
begin
  update public."user" set "supabaseId" = null where "email" = new.email;

  RETURN NEW;
end;
$$;


CREATE TRIGGER set_supabase_id
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION update_supabase_id();

CREATE TRIGGER delete_supabase_id
AFTER delete ON auth.users
FOR EACH ROW
EXECUTE FUNCTION delete_supabase_id();

