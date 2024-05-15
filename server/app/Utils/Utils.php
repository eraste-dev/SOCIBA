<?php

namespace App\Utils;

class Utils
{
    static public function DATE_FORMAT()
    {
        if (!defined('DATE_FORMAT')) {
            define('DATE_FORMAT', 'Y-m-d H:i:s');
        }
        return DATE_FORMAT;
    }
}
