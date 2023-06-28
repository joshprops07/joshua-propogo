<template>
    <q-layout class="background">
       <div class="flex flex-center">
        <q-card class="text-center my-card q-pa-md" flat>
            <q-card-section class="text-card">
                ADVICE #{{ num }}
            </q-card-section>
            <q-card-section class="text">
                "{{ random }}"
            </q-card-section>
            <q-card-section class="q-mb-md">
               <q-img class="img" src="../css/pattern-divider-desktop.svg"/>
            </q-card-section>
            <div class="absolute-bottom adjust">
                <q-btn round type="button" class="color-btn" icon="casino" @click="randomFunction"/>
            </div>
        </q-card>
       </div>
    </q-layout>
</template>

<script src="../pages/script/AdviceGenerator.js">
</script>

<style>
@import url('../pages/style/AdviceGenerator.scss');
</style>