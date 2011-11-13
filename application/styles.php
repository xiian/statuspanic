<?php
class Styles extends Collection {
    public function __toString() {
        return implode('; ', $this->coll);
    }
}