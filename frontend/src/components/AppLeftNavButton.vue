<template>
    <div>

        <!-- start of show left nav btn -->
        <button @click.prevent="commitUpdateNav({state: true})" class="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 fill-current text-slate-500 hover:text-slate-900" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
        </button>
        <!-- end of show left nav btn -->
        
    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: "AppLeftNavButton",
    computed: {
        ...mapState({
            nav: state => state.nav,
        }),
    },
    methods: {
        ...mapActions([
            "commitUpdateNav",
        ]),
    }
}
</script>