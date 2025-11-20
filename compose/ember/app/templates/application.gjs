import { pageTitle } from 'ember-page-title';
import ThemeSwitcher from 'email-frontend/components/theme-switcher';
import Snackbar from 'email-frontend/components/snackbar';

<template>
  {{pageTitle "EmailFrontend"}}

  <div class="app-shell" role="application">
    <header class="app-header">
      <h1 class="brand">Email Frontend</h1>
      <ThemeSwitcher />
    </header>

    <main class="app-main">
      {{outlet}}
    </main>

    <Snackbar />
  </div>

</template>
