<?php
class Bars extends Collection {
    protected $coll = array();
    protected $position = 0;
    protected $maxBarHeight = 0;
    protected $maxBarWidth = 300;
    protected $maxHeight = 0;
    protected $maxWidth = 0;
    protected $defaultPadding = 0;

    public function add(Bar $bar) {
        parent::add($bar);
        $bar->setContainer($this);
        $this->tryNewMaxBarHeight($bar->total);
    }

    public function getCollection() {
      return $this->coll;
    }

    public function tryNewMaxBarHeight($height) {
        if ($height > $this->maxBarHeight) {
            $this->maxBarHeight = $height;
        }
    }

    public function getMaxBarHeight() {
        return $this->maxBarHeight;
    }

    public function setMaxHeight($height) {
        $this->maxHeight = $height;
    }

    public function getMaxHeight() {
        return $this->maxHeight;
    }

    public function setMaxBarWidth($width) {
        if ($width > 0) {
            $this->maxBarWidth = $width;
        }
    }

    public function setMaxWidth($width) {
        if ($width > 0) {
            $this->maxWidth = $width;
        }
    }

    public function getMaxWidth() {
        return $this->maxWidth;
    }

    public function getMaxBarWidth() {
        return $this->maxBarWidth;
    }

    public function setDefaultPadding($padding) {
        $this->defaultPadding = $padding;
    }

    public function getDefaultPadding() {
        return $this->defaultPadding;
    }

    public function getTotalOuter() {
        return $this->getDefaultPadding() * 2;
    }

    public function getWidth() {
        return floor(min($this->maxBarWidth, ($this->maxWidth - ($this->getTotalOuter() * count($this->coll))) / count($this->coll)));
    }

    public function getFinalPadding() {
        return max($this->getDefaultPadding(), ($this->maxWidth - (($this->getWidth() + $this->getTotalOuter()) * count($this->coll))) / count($this->coll) / 2);
    }
}