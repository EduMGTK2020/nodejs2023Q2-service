FROM postgres:15.3-alpine

# ARG POSTGRES_USER
# ARG POSTGRES_PASSWORD
# ARG POSTGRES_DB

# ENV POSTGRES_USER=$POSTGRES_USER
# ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
# ENV POSTGRES_DB=$POSTGRES_DB

# Copy .sql script to container
#COPY init.sql /docker-entrypoint-initdb.d/

# Set permissions for .sql script
#RUN chmod a+r /docker-entrypoint-initdb.d/init.sql

# Expose PostgreSQL port
# EXPOSE 5432