<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
    :class="lightDark ? 'bg-teal' : 'bg-dark'"
    elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          User Management System
        </q-toolbar-title>

        <div class="q-px-md q-gutter-x-md">
          <q-btn :label="lightDark ? 'Light' : 'Dark'" :color="lightDark ? 'orange-9' : 'grey-9'" @click="toggle" />
          <q-btn icon="house" flat dense round  to="/joshua-propogo"/>
          <q-btn icon="person" flat round dense />
          <q-btn icon="settings" flat round dense />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
    class="bg-grey-4"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>  
        <q-item-label
          header
          class=" q-py-lg"
        >
        <div class="flex flex-center">
          <q-avatar round color="teal text-white" size="65px" icon="person"/>
          <div class="q-pl-sm text-grey-8" style="font-size: 13px;">
           <span>Joshua Petes Propogo</span>
           <div>joshuapropogo07@gmail.com</div>
        </div>
        </div>
        </q-item-label>

        <q-separator />

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { lightDark } from '../composables/Task';

const linksList = [
  {
    title: 'List Of Users',
    icon: 'people',
    route_name: 'my-listOfUser'
  },
  {
    title: 'Add Users',
    icon: 'person',
    route_name: 'my-addUser'
  },
  // {
  //   title: 'My Tasks',
  //   caption: 'List of unfinished tasks',
  //   icon: 'task',
  //   route_name: 'my-tasks'
  // },
  // {
  //   title: 'Finished Tasks',
  //   caption: 'List of unfinished tasks',
  //   icon: 'check_circle_outline',
  //   route_name: 'finished-tasks'
  // },
  // {
  //   title: 'Deleted Tasks',
  //   caption: 'List of unfinished tasks',
  //   icon: 'delete_outline',
  //   route_name: 'deleted-tasks'
  // },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    const toggle = () => {
      lightDark.value = !lightDark.value
    }
    return {
      lightDark,
      toggle,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
