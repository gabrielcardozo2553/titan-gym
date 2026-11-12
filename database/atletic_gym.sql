
SET NAMES utf8mb4;

DROP DATABASE IF EXISTS atletic_gym;
CREATE DATABASE atletic_gym CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE atletic_gym;

CREATE TABLE usuarios (
  id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario   VARCHAR(50)  NOT NULL,
  password  CHAR(32)     NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_usuarios_usuario (usuario)
) ENGINE=InnoDB;

CREATE TABLE novedades (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo     VARCHAR(150) NOT NULL,
  subtitulo  TEXT         NOT NULL,
  cuerpo     TEXT         NOT NULL,
  img_id     VARCHAR(255) NULL,
  categoria  ENUM('clases','eventos','consejos','promociones') NOT NULL DEFAULT 'clases',
  fecha      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  id_usuario INT UNSIGNED NULL,
  PRIMARY KEY (id),
  KEY idx_novedades_fecha (fecha),
  KEY idx_novedades_usuario (id_usuario)
) ENGINE=InnoDB;

CREATE TABLE planes (
  id              INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nombre          VARCHAR(80)   NOT NULL,
  descripcion     VARCHAR(255)  NOT NULL,
  precio          DECIMAL(10,2) NOT NULL,
  dias_por_semana TINYINT UNSIGNED NOT NULL,
  destacado       TINYINT(1)    NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE entrenadores (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre        VARCHAR(100) NOT NULL,
  cargo         VARCHAR(100) NOT NULL,
  especialidad  VARCHAR(100) NOT NULL,
  bio           VARCHAR(500) NOT NULL,
  foto          VARCHAR(150) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE contactos (
  id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre    VARCHAR(100) NOT NULL,
  email     VARCHAR(150) NOT NULL,
  telefono  VARCHAR(30)  NULL,
  motivo    VARCHAR(60)  NULL,
  id_plan   INT UNSIGNED NULL,
  mensaje   TEXT         NOT NULL,
  fecha     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contactos_fecha (fecha),
  KEY idx_contactos_plan (id_plan)
) ENGINE=InnoDB;

ALTER TABLE novedades
  ADD CONSTRAINT fk_novedades_usuario FOREIGN KEY (id_usuario)
  REFERENCES usuarios (id) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE contactos
  ADD CONSTRAINT fk_contactos_plan FOREIGN KEY (id_plan)
  REFERENCES planes (id) ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO usuarios (usuario, password) VALUES
  ('admin', MD5('admin123'));

INSERT INTO planes (nombre, descripcion, precio, dias_por_semana, destacado) VALUES
  ('Básico',   'Acceso a sala de musculación y vestuarios, 3 días por semana.',        18000.00, 3, 0),
  ('Full',     'Sala libre todos los días más todas las clases grupales.',             26000.00, 7, 1),
  ('Estudiante','Sala de musculación 5 días por semana con tarifa reducida.',          21000.00, 5, 0);

INSERT INTO entrenadores (nombre, cargo, especialidad, bio, foto) VALUES
  ('Martín Ríos',   'Director y entrenador', 'Fuerza y musculación',
   'Profesor de Educación Física con 12 años de experiencia armando rutinas de fuerza para todos los niveles.',
   '/images/nosotros/entrenador1.svg'),
  ('Lucía Fernández','Coordinadora de clases','Funcional y HIIT',
   'Diseña las clases grupales de alta intensidad y acompaña a quienes arrancan desde cero.',
   '/images/nosotros/entrenador2.svg'),
  ('Diego Salazar', 'Entrenador', 'Crossfit y resistencia',
   'Ex atleta de remo. Se encarga de los entrenamientos de resistencia y de la preparación física para competencias.',
   '/images/nosotros/entrenador3.svg'),
  ('Camila Torres', 'Instructora', 'Yoga y movilidad',
   'Instructora de yoga y stretching enfocada en la recuperación y la prevención de lesiones.',
   '/images/nosotros/entrenador4.svg'),
  ('Nicolás Vega',  'Nutricionista', 'Nutrición deportiva',
   'Licenciado en Nutrición. Realiza planes alimentarios personalizados para los socios del gimnasio.',
   '/images/nosotros/entrenador5.svg');

INSERT INTO novedades (titulo, subtitulo, cuerpo, img_id, categoria, fecha, id_usuario) VALUES
  ('Nueva clase de HIIT los sábados',
   'Arrancamos el fin de semana con 45 minutos de alta intensidad.',
   '<p>Desde este mes sumamos una clase de <strong>HIIT</strong> los sábados a las 9:00. Cupos limitados a 20 personas, reservá tu lugar en recepción.</p>',
   NULL, 'clases', '2026-10-20 10:00:00', 1),
  ('Torneo interno de press de banca',
   'Inscripción abierta para socios de todos los niveles.',
   '<p>El <strong>14 de noviembre</strong> se realiza el torneo interno. Habrá categorías por peso corporal y premios para los tres primeros puestos.</p>',
   NULL, 'eventos', '2026-10-25 12:30:00', 1),
  ('Cinco consejos para no perder la rutina',
   'Pequeños hábitos que hacen la diferencia.',
   '<p>Dormí bien, planificá tus entrenamientos como una reunión, preparate la ropa la noche anterior, entrená acompañado y celebrá cada logro.</p>',
   NULL, 'consejos', '2026-10-28 18:15:00', 1),
  ('Promo de verano: inscripción gratis',
   'Sumate durante noviembre y no pagás la matrícula.',
   '<p>Si te inscribís en un plan <strong>Full</strong> antes de fin de mes, la matrícula va por nuestra cuenta.</p>',
   NULL, 'promociones', '2026-10-30 09:00:00', 1);

INSERT INTO contactos (nombre, email, telefono, motivo, id_plan, mensaje, fecha) VALUES
  ('Sofía Medina', 'sofia.medina@example.com', '3794123456', 'Consulta sobre clases', 2,
   'Hola, quería saber si tienen clases de yoga por la mañana.', '2026-10-29 14:20:00');
