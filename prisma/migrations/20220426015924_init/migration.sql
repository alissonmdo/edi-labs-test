-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "manager_id" INTEGER,
    "job_id" INTEGER NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_description_key" ON "jobs"("description");

-- AddForeignKey
ALTER TABLE
    "users"
ADD
    CONSTRAINT "users_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE
SET
    NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE
    "users"
ADD
    CONSTRAINT "users_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO
    jobs (id, description)
VALUES
    (1, 'developer'),
    (2, 'tech_lead'),
    (3, 'scrum');

ALTER SEQUENCE jobs_id_seq RESTART 4;

INSERT INTO
    users (id, "name", email, manager_id, job_id)
VALUES
    (1, 'Adam Smith', 'asmith@llc.com', 2, 1),
    (2, 'Fiodor Dostoivisk', 'fdost@llc.com', 2, 1),
    (3, 'Sebastian Bach', 'sbach@llc.com', 3, 2),
    (
        4,
        'Winston Churchill',
        'wchurch@llc.com',
        NULL,
        3
    );

ALTER SEQUENCE users_id_seq RESTART 5;