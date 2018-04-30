<?php

class formatter {

  public function htmlEntities($text) {
    if( $text != '' ){
      return html_entity_decode($text, ENT_QUOTES | ENT_XML1, 'UTF-8');
    }
  }

}
