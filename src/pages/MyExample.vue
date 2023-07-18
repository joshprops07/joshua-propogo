<template>
  <q-layout class="q-pa-xl">
    <q-input outlined v-model="inputColor"/>

    <!-- <p :class="`text-bold text-${inputColor}`">
        {{ inputColor }}
    </p> -->

    <div v-if="inputColor === 'orange'" :class="`text-bold text-${inputColor}`">
        1. It is a color {{ inputColor }}
    </div>

    <div v-else-if="inputColor === 'red'" :class="`text-bold text-${inputColor}`">
        2. It is a color {{ inputColor }} 
    </div>

    <div v-else :class="`text-bold text-${inputColor}`">
      3. It is random color {{ inputColor }} 
    </div>

    <q-btn label="Count" @click="count()"/> 
    {{ btnCount }}
  </q-layout>
</template>

<script src="../pages/script/Example">
</script>