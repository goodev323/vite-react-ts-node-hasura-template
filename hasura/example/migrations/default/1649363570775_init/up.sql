
SET check_function_bodies = false;
CREATE TABLE public.users (
    user_id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL
);
CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);

INSERT INTO users (name, email) VALUES
    ('Example1', 'one@example.com'),
    ('Example2', 'two@example.com'),
    ('Example3', 'three@example.com');
