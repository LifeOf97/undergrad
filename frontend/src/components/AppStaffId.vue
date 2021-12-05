<template>
    <div class="flex items-center justify-between select-none lg:justify-end">

        <!-- start of show left nav btn -->
        <button @click.prevent="commitUpdateNav({state: true})" class="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 fill-current text-blueGray-500 hover:text-blueGray-900" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
        </button>
        <!-- end of show left nav btn -->

        <!-- start of staff name/id -->
        <div class="flex items-center justify-between space-x-2">
            <img :src="img" alt="Staff avatar" class="w-10 h-10 rounded-full object-cover object-top border border-red-50">

            <div class="flex flex-col">
                <h3 class="text-blueGray-900 text-sm font-semibold w-24 truncate">Tunde Sitowellllllll</h3>
                <p class="text-blueGray-500 text-xs">STAFF ID: 1234</p>
            </div>
        </div>
        <!-- start of staff name/id -->

    </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
    name: "AppStaffId",
    data() {
        return {
            img: require("@/assets/images/staffimg.jpeg").default,
        }
    },
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