<?php
class Bar {
    /**
     *
     * @var Bars
     */
    protected $container;

    public $title;
    public $total;
    public $complete;

    function __construct($title, $total, $complete) {
        $this->title = $title;
        $this->total = $total;
        $this->complete = $complete;
    }

    public function setContainer(Bars $bars) {
        $this->container = $bars;
    }

    public function getHeight() {
        return floor(($this->total / $this->container->getMaxBarHeight()) * $this->container->getMaxHeight());
    }

    public function getBarStyle() {
        $styles = new Styles();
            $styles[] = 'margin-top: ' . ($this->container->getMaxHeight() - $this->getHeight($this->container->getMaxHeight()))    . 'px';
            $styles[] = 'width: '      . $this->container->getWidth()        . 'px';
            $styles[] = 'padding: '    . $this->container->getFinalPadding() . 'px';
        return $styles;
    }

    public function getLegendStyle() {
        $styles = new Styles();
        $styles[] = 'width: '   . $this->container->getWidth()        . 'px';
        $styles[] = 'padding: ' . $this->container->getFinalPadding() . 'px';
        return $styles;
    }
}