<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="$store.getters.username" />
      <v-spacer />
      <v-toolbar-title v-text="$store.getters.userId" />
      <v-spacer />
      <v-btn
        icon
        @click.prevent="register"
      >
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <v-btn
        icon
        :disabled="!$store.getters.hasToken"
        @click.prevent="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-folder-multiple',
          title: 'Все курсы',
          to: '/allCources'
        },
        {
          icon: 'mdi-folder',
          title: 'Мои курсы',
          to: '/myCources'
        }
      ],
      miniVariant: false
    }
  },
  methods: {
    logout () {
      this.$axios.post('/auth/cookie', '', { withCredentials: true })
      .then((result) => {
        this.$store.dispatch('logout')
        this.$router.push('/')
      })
      .catch((error) => {
        this.error = error
      })
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>
