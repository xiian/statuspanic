<?php
class Collection implements ArrayAccess, Iterator, Countable {
    protected $coll = array();
    protected $position = 0;

    public function add($item) {
        $this->coll[] = $item;
    }

    /**
     * INTERFACE STUFF BELOW
     */


    public function count() {
        return count($this->coll);
    }

    public function offsetExists($offset) {
        return isset($this->coll[$offset]);
    }

    public function offsetGet($offset) {
        if (!$this->offsetExists($offset)) {
            return false;
        }
        return $this->coll[$offset];
    }

    public function offsetSet($offset, $value) {
        if (!empty($offset)) {
            $this->coll[$offset] = $value;
        } else {
            $this->coll[$this->position++] = $value;
        }
    }

    public function offsetUnset($offset) {
        unset($this->coll[$offset]);
    }

    public function current() {
        return current($this->coll);
    }

    public function key() {
        return key($this->coll);
    }

    public function next() {
        next($this->coll);
    }

    public function rewind() {
        reset($this->coll);
    }

    public function valid() {
        return (bool) current($this->coll);
    }
}