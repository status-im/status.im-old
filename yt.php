<?php
$opt = $_SERVER['QUERY_STRING'];
$urls = array(
    "blog" => "https://blog.status.im",
    "twitter" => "https://twitter.com/ethstatus",
    "slack" => "http://slack.status.im",
    "wiki" => "https://wiki.status.im"
);

if (array_key_exists($opt, $urls)) {
    header('Location: '.$urls[$opt]);
} else {
    header('Location: https://status.im');
}