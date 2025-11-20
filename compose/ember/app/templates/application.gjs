import { pageTitle } from 'ember-page-title';
import ThemeSwitcher from 'email-frontend/components/theme-switcher';
import UserProfile from 'email-frontend/components/user-profile';
import Snackbar from 'email-frontend/components/snackbar';

<template>
  {{pageTitle "EmailFrontend"}}

  <div class="app-shell" role="application">
    <header class="app-header">
      <h1 class="brand">Email Frontend</h1>
      <div style="display:flex;align-items:center;gap:12px;">
        <ThemeSwitcher />
        <UserProfile />
      </div>
    </header>

    <main class="app-main">
      {{outlet}}
    </main>

    <Snackbar />
  </div>

</template>
