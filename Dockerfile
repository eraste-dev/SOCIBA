FROM php:8.0-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    sqlite3

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /app

# Copy composer files
COPY server/composer.json server/composer.lock ./server/

# Install project dependencies
RUN cd server && composer install -q --no-ansi --no-interaction --no-scripts --no-progress --prefer-dist

# Copy the rest of the application code
COPY server ./server

# Set permissions (adjust as needed)
RUN chmod -R 777 server/storage server/bootstrap/cache

# Set entrypoint for running tests
CMD ["php", "server/artisan", "test"]

