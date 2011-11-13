<?php
class Module {
    public $name;
    public $width;
    public $update;
    public $class;
    public $args;
    public function __construct(StdClass $in) {
        $this->args = new StdClass();
        foreach($in as $k => $v) {
            if (is_array($v)) {
                $v = (object) $v;
            }
            $this->$k = $v;
        }
        // Set id from name
        $this->id = $this->name . '_' . rand(1,100);
    }
    public function render() {
        $this->args->width = $this->width;

        $argstr = "'" . http_build_query($this->args) . "'";

        $style = "width: {$this->width}px;";
        if (isset($this->height)) {
            $style .= " height: {$this->height}px";
        }
        echo '<div class="module ' . $this->class . '" id="' . $this->id . '" style="' . $style . '"></div>';
        echo "<script type='text/javascript'>activate_module('$this->id', '$this->name', $this->update, $argstr);</script>\n\n";
    }
}