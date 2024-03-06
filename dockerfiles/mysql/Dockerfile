FROM mysql:8.3
COPY schema.sql /docker-entrypoint-initdb.d/schema.sql
CMD ["mysqld"]