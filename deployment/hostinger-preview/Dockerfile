FROM drupal:11.4.5-apache

COPY apache-security.conf /etc/apache2/conf-available/avnl-security.conf
COPY php-production.ini /usr/local/etc/php/conf.d/zz-avnl-production.ini

RUN apt-get update \
    && apt-get install -y --no-install-recommends $PHPIZE_DEPS \
    && pecl install apcu uploadprogress \
    && docker-php-ext-enable apcu uploadprogress \
    && apt-get purge -y --auto-remove $PHPIZE_DEPS \
    && rm -rf /var/lib/apt/lists/* \
    && a2enmod headers rewrite expires deflate \
    && a2enconf avnl-security

WORKDIR /opt/drupal/web
