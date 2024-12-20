<?php

namespace Tests\App\Utils;

use App\Utils\Utils;
use PHPUnit\Framework\TestCase;


class UtilsTest extends TestCase
{
    public function testDateFormat()
    {
        $this->assertEquals('Y-m-d H:i:s', Utils::DATE_FORMAT());
    }

    public function testStateConstants()
    {
        $this->assertEquals('PUBLISH', Utils::STATE_PUBLISH());
        $this->assertEquals('DRAFT', Utils::STATE_DRAFT());
        $this->assertEquals('DELETED', Utils::STATE_DELETED());
        $this->assertEquals('REJECTED', Utils::STATE_REJECTED());
        $this->assertEquals('PENDING', Utils::STATE_PENDING());
        $this->assertEquals('BLOCKED', Utils::STATE_BLOCKED());
    }

    public function testTypeConstants()
    {
        $this->assertEquals('LOCATION', Utils::TYPE_LOCATION());
        $this->assertEquals('BIEN EN VENTE', Utils::TYPE_BIEN_EN_VENTE());
        $this->assertEquals('RESERVATION', Utils::TYPE_RESERVATION());
    }

    public function testUserConstants()
    {
        $this->assertEquals('ADMIN', Utils::USER_ADMIN());
        $this->assertEquals('USER', Utils::USER_DEFAULT());
        $this->assertEquals('GUEST', Utils::USER_GUEST());
    }
}
