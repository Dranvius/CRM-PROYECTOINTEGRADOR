--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1+b2)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1+b2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: us_st_trigger(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.us_st_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO staff (fecha_inicio)
  VALUES (current_timestamp)
  RETURNING id_staff INTO NEW.id_staff;

  RETURN NEW;
END;
$$;


ALTER FUNCTION public.us_st_trigger() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: client; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.client (
    id_client smallint NOT NULL,
    firstname character varying(60),
    lastname character varying(60),
    cc character varying(12),
    numbercelphone character varying(16),
    mail character varying(50),
    statusc boolean,
    relation_staff smallint NOT NULL
);


ALTER TABLE public.client OWNER TO postgres;

--
-- Name: client_id_client_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_id_client_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.client_id_client_seq OWNER TO postgres;

--
-- Name: client_id_client_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_id_client_seq OWNED BY public.client.id_client;


--
-- Name: client_relation_staff_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.client_relation_staff_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.client_relation_staff_seq OWNER TO postgres;

--
-- Name: client_relation_staff_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.client_relation_staff_seq OWNED BY public.client.relation_staff;


--
-- Name: envio_p; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.envio_p (
    id_envioproduct smallint NOT NULL,
    rela_cliente smallint NOT NULL
);


ALTER TABLE public.envio_p OWNER TO postgres;

--
-- Name: envio_p_id_envioproduct_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.envio_p_id_envioproduct_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.envio_p_id_envioproduct_seq OWNER TO postgres;

--
-- Name: envio_p_id_envioproduct_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.envio_p_id_envioproduct_seq OWNED BY public.envio_p.id_envioproduct;


--
-- Name: envio_p_rela_cliente_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.envio_p_rela_cliente_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.envio_p_rela_cliente_seq OWNER TO postgres;

--
-- Name: envio_p_rela_cliente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.envio_p_rela_cliente_seq OWNED BY public.envio_p.rela_cliente;


--
-- Name: localization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.localization (
    id_local_clien smallint NOT NULL,
    department character varying(30),
    city character varying(30),
    addres character varying(60)
);


ALTER TABLE public.localization OWNER TO postgres;

--
-- Name: localization_id_local_clien_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.localization_id_local_clien_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.localization_id_local_clien_seq OWNER TO postgres;

--
-- Name: localization_id_local_clien_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.localization_id_local_clien_seq OWNED BY public.localization.id_local_clien;


--
-- Name: personaldats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personaldats (
    id_personalid smallint NOT NULL,
    firstname character varying(60),
    lastname character varying(60),
    cc character varying(12),
    numbercelphone character varying(16),
    id_users smallint NOT NULL
);


ALTER TABLE public.personaldats OWNER TO postgres;

--
-- Name: personaldats_id_personalid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personaldats_id_personalid_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.personaldats_id_personalid_seq OWNER TO postgres;

--
-- Name: personaldats_id_personalid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personaldats_id_personalid_seq OWNED BY public.personaldats.id_personalid;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id_product smallint NOT NULL,
    nameproduct character varying(30) NOT NULL,
    price integer NOT NULL,
    description character varying(200) NOT NULL,
    discount character varying(3),
    status boolean
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_id_product_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_product_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_product_seq OWNER TO postgres;

--
-- Name: product_id_product_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_product_seq OWNED BY public.product.id_product;


--
-- Name: quotation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quotation (
    id_quotation smallint NOT NULL,
    valor character varying(30),
    cliente_coti smallint NOT NULL
);


ALTER TABLE public.quotation OWNER TO postgres;

--
-- Name: quotation_cliente_coti_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quotation_cliente_coti_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quotation_cliente_coti_seq OWNER TO postgres;

--
-- Name: quotation_cliente_coti_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quotation_cliente_coti_seq OWNED BY public.quotation.cliente_coti;


--
-- Name: quotation_id_quotation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quotation_id_quotation_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quotation_id_quotation_seq OWNER TO postgres;

--
-- Name: quotation_id_quotation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quotation_id_quotation_seq OWNED BY public.quotation.id_quotation;


--
-- Name: quotation_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quotation_product (
    id_quo_pro smallint NOT NULL,
    rela_cotiqp integer,
    rela_prodqp integer,
    address character varying(60),
    cantidad numeric(12,2) DEFAULT 0 NOT NULL
);


ALTER TABLE public.quotation_product OWNER TO postgres;

--
-- Name: quotation_product_id_quo_pro_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quotation_product_id_quo_pro_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quotation_product_id_quo_pro_seq OWNER TO postgres;

--
-- Name: quotation_product_id_quo_pro_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quotation_product_id_quo_pro_seq OWNED BY public.quotation_product.id_quo_pro;


--
-- Name: sent_quotation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sent_quotation (
    id_sent_quotation smallint NOT NULL,
    nombre_usuario character varying(30),
    nomb_cli_coti character varying(30)
);


ALTER TABLE public.sent_quotation OWNER TO postgres;

--
-- Name: sent_quotation_id_sent_quotation_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sent_quotation_id_sent_quotation_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sent_quotation_id_sent_quotation_seq OWNER TO postgres;

--
-- Name: sent_quotation_id_sent_quotation_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sent_quotation_id_sent_quotation_seq OWNED BY public.sent_quotation.id_sent_quotation;


--
-- Name: staff; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff (
    id_staff smallint NOT NULL,
    fecha_inicio timestamp without time zone
);


ALTER TABLE public.staff OWNER TO postgres;

--
-- Name: staff_id_staff_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.staff_id_staff_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.staff_id_staff_seq OWNER TO postgres;

--
-- Name: staff_id_staff_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.staff_id_staff_seq OWNED BY public.staff.id_staff;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_users smallint NOT NULL,
    email character varying(30),
    pass character varying(100),
    tipo boolean,
    status boolean,
    id_staff smallint
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_users_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_users_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_users_seq OWNER TO postgres;

--
-- Name: usuario_id_users_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_users_seq OWNED BY public.usuario.id_users;


--
-- Name: client id_client; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client ALTER COLUMN id_client SET DEFAULT nextval('public.client_id_client_seq'::regclass);


--
-- Name: client relation_staff; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client ALTER COLUMN relation_staff SET DEFAULT nextval('public.client_relation_staff_seq'::regclass);


--
-- Name: envio_p id_envioproduct; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.envio_p ALTER COLUMN id_envioproduct SET DEFAULT nextval('public.envio_p_id_envioproduct_seq'::regclass);


--
-- Name: envio_p rela_cliente; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.envio_p ALTER COLUMN rela_cliente SET DEFAULT nextval('public.envio_p_rela_cliente_seq'::regclass);


--
-- Name: localization id_local_clien; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localization ALTER COLUMN id_local_clien SET DEFAULT nextval('public.localization_id_local_clien_seq'::regclass);


--
-- Name: personaldats id_personalid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaldats ALTER COLUMN id_personalid SET DEFAULT nextval('public.personaldats_id_personalid_seq'::regclass);


--
-- Name: product id_product; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id_product SET DEFAULT nextval('public.product_id_product_seq'::regclass);


--
-- Name: quotation id_quotation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotation ALTER COLUMN id_quotation SET DEFAULT nextval('public.quotation_id_quotation_seq'::regclass);


--
-- Name: quotation cliente_coti; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotation ALTER COLUMN cliente_coti SET DEFAULT nextval('public.quotation_cliente_coti_seq'::regclass);


--
-- Name: quotation_product id_quo_pro; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotation_product ALTER COLUMN id_quo_pro SET DEFAULT nextval('public.quotation_product_id_quo_pro_seq'::regclass);


--
-- Name: sent_quotation id_sent_quotation; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sent_quotation ALTER COLUMN id_sent_quotation SET DEFAULT nextval('public.sent_quotation_id_sent_quotation_seq'::regclass);


--
-- Name: staff id_staff; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff ALTER COLUMN id_staff SET DEFAULT nextval('public.staff_id_staff_seq'::regclass);


--
-- Name: usuario id_users; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_users SET DEFAULT nextval('public.usuario_id_users_seq'::regclass);


--
-- Data for Name: client; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.client (id_client, firstname, lastname, cc, numbercelphone, mail, statusc, relation_staff) FROM stdin;
2	Sergio	Linares	1023974646	3202813850	dranvius12@gmail.com	t	1
3	Edward	Linares	102392	3202813850	m@gmail.com	t	1
\.


--
-- Data for Name: envio_p; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.envio_p (id_envioproduct, rela_cliente) FROM stdin;
\.


--
-- Data for Name: localization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.localization (id_local_clien, department, city, addres) FROM stdin;
\.


--
-- Data for Name: personaldats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personaldats (id_personalid, firstname, lastname, cc, numbercelphone, id_users) FROM stdin;
10	Alexis	Linares	1234567890	3001234567	1
13	edward	linares	10239743	3202813850	3
14	Sergio	Linares	1023974932	3202813850	4
15	Julian	Fernando	102397463	3202813812	5
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id_product, nameproduct, price, description, discount, status) FROM stdin;
2	archivo rodante	10000000	 Archivo rodante con especificaciones 3 metros ancho x 2,5 metros de alto x 3 metros de produndidad color gris metalico.	8%	t
3	Silla para cubiculo	150000	Silla sencilla con rodachinas para cubículo empresarial sin brazos laterales con tapizado verde oscuro.	0%	t
5	asd	123	asd	\N	t
6	asd	123	asd	5	t
1	silla de oficina normal	1200000	Silla de oficina gerencial negra, con cabecero ajustable,  reclinable con  especificaciones  42 cm en malla de tela ,10 cm bandeja de asiento con ancho de 47cm en metal reforzado con acabado cromado.	5	f
7	Sillas rojas	2000	estadoinicial	5	t
\.


--
-- Data for Name: quotation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quotation (id_quotation, valor, cliente_coti) FROM stdin;
3	32844000	2
4	21896000	2
5	32844000	3
\.


--
-- Data for Name: quotation_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quotation_product (id_quo_pro, rela_cotiqp, rela_prodqp, address, cantidad) FROM stdin;
4	2	3	calle 57 # 46-70 	0.00
5	2	2	calle 57 # 46-70 	0.00
6	4	2	\N	2.00
7	5	2	\N	3.00
\.


--
-- Data for Name: sent_quotation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sent_quotation (id_sent_quotation, nombre_usuario, nomb_cli_coti) FROM stdin;
1	Sergio	Camila
2	Sergio	Mateo
3	Alexis	Sergio
4	Alexis	Sergio
5	Alexis	Sergio
6	Alexis	Sergio
\.


--
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff (id_staff, fecha_inicio) FROM stdin;
1	2025-04-02 00:35:01.361499
39	2025-04-02 15:48:38.452773
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id_users, email, pass, tipo, status, id_staff) FROM stdin;
1	alexis@example.com	$2a$10$BbySCGKcvAL7YCszlKZIc.KaMZAZKzkOpFX//EeYfs7.EC4wxBDui	f	f	1
2	dranvius12*hotmail.com	$2a$10$8aEca6bsHwYPhQlgAMwZiOrRujMtn5FKj9lWPrAbIFL9NJdpDAWKy	t	t	\N
3	dranvius12@gmail.com	$2a$10$yEgeneX.AKLzDw9GCtm59eg/U.IpsZbHr5a6QJ9a7qbGzI3Os0nCy	t	f	\N
4	dranvius12@gmail.com	$2a$10$gjK50kkOJyTbRL6zzbqcmuMxjB89QArmVbIug06tL1/3zynCmGZY6	f	t	\N
5	d@gmail.com	$2a$10$XxzMYuJXynymfFcfEcaKSuTIFOMePX7CKrAp3ls44W5dQIdwJMN66	t	t	39
\.


--
-- Name: client_id_client_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_id_client_seq', 3, true);


--
-- Name: client_relation_staff_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.client_relation_staff_seq', 1, false);


--
-- Name: envio_p_id_envioproduct_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.envio_p_id_envioproduct_seq', 1, false);


--
-- Name: envio_p_rela_cliente_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.envio_p_rela_cliente_seq', 1, false);


--
-- Name: localization_id_local_clien_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.localization_id_local_clien_seq', 1, true);


--
-- Name: personaldats_id_personalid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personaldats_id_personalid_seq', 15, true);


--
-- Name: product_id_product_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_product_seq', 7, true);


--
-- Name: quotation_cliente_coti_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quotation_cliente_coti_seq', 1, false);


--
-- Name: quotation_id_quotation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quotation_id_quotation_seq', 5, true);


--
-- Name: quotation_product_id_quo_pro_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quotation_product_id_quo_pro_seq', 7, true);


--
-- Name: sent_quotation_id_sent_quotation_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sent_quotation_id_sent_quotation_seq', 6, true);


--
-- Name: staff_id_staff_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.staff_id_staff_seq', 39, true);


--
-- Name: usuario_id_users_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_users_seq', 5, true);


--
-- Name: client client_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (id_client);


--
-- Name: envio_p envio_p_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.envio_p
    ADD CONSTRAINT envio_p_pkey PRIMARY KEY (id_envioproduct);


--
-- Name: localization localization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localization
    ADD CONSTRAINT localization_pkey PRIMARY KEY (id_local_clien);


--
-- Name: personaldats personaldats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaldats
    ADD CONSTRAINT personaldats_pkey PRIMARY KEY (id_personalid);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id_product);


--
-- Name: quotation quotation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotation
    ADD CONSTRAINT quotation_pkey PRIMARY KEY (id_quotation);


--
-- Name: quotation_product quotation_product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotation_product
    ADD CONSTRAINT quotation_product_pkey PRIMARY KEY (id_quo_pro);


--
-- Name: sent_quotation sent_quotation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sent_quotation
    ADD CONSTRAINT sent_quotation_pkey PRIMARY KEY (id_sent_quotation);


--
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (id_staff);


--
-- Name: personaldats uq_cc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaldats
    ADD CONSTRAINT uq_cc UNIQUE (cc);


--
-- Name: product uq_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT uq_product UNIQUE (id_product);


--
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_users);


--
-- Name: usuario us_st_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER us_st_update BEFORE INSERT ON public.usuario FOR EACH ROW EXECUTE FUNCTION public.us_st_trigger();


--
-- Name: envio_p fk_client; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.envio_p
    ADD CONSTRAINT fk_client FOREIGN KEY (rela_cliente) REFERENCES public.client(id_client);


--
-- Name: quotation fk_client; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotation
    ADD CONSTRAINT fk_client FOREIGN KEY (cliente_coti) REFERENCES public.client(id_client);


--
-- Name: usuario fk_usuario_staff; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_usuario_staff FOREIGN KEY (id_staff) REFERENCES public.staff(id_staff);


--
-- Name: localization localization_id_local_clien_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localization
    ADD CONSTRAINT localization_id_local_clien_fkey FOREIGN KEY (id_local_clien) REFERENCES public.client(id_client);


--
-- Name: personaldats personaldats_id_personalid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personaldats
    ADD CONSTRAINT personaldats_id_personalid_fkey FOREIGN KEY (id_users) REFERENCES public.usuario(id_users);


--
-- Name: quotation quotation_id_quotation_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotation
    ADD CONSTRAINT quotation_id_quotation_fkey FOREIGN KEY (id_quotation) REFERENCES public.sent_quotation(id_sent_quotation);


--
-- Name: quotation rela_client_coti; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotation
    ADD CONSTRAINT rela_client_coti FOREIGN KEY (cliente_coti) REFERENCES public.client(id_client);


--
-- Name: localization rela_local; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.localization
    ADD CONSTRAINT rela_local FOREIGN KEY (id_local_clien) REFERENCES public.client(id_client);


--
-- Name: quotation_product rela_product_qp; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quotation_product
    ADD CONSTRAINT rela_product_qp FOREIGN KEY (rela_prodqp) REFERENCES public.product(id_product);


--
-- Name: client rela_staff; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.client
    ADD CONSTRAINT rela_staff FOREIGN KEY (relation_staff) REFERENCES public.staff(id_staff);


--
-- PostgreSQL database dump complete
--

