// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import "bootstrap"
import "../stylesheets/home.scss"

window.jQuery = $;
window.$ = $;

import toastr from 'toastr'
window.toastr = toastr

import "@fortawesome/fontawesome-free/css/all.css";
import "./custom";

import "./main";
import "./uikit.min";
import  "./uikit-icons.min";
import  "./libs";
import  "./darkmode.min";



