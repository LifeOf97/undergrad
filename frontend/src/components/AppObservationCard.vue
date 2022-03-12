<template>
    <div>

        <details class="w-full flex flex-col gap-4 bg-slate-50 rounded-md p-4 shadow open:shadow-lg hover:shadow-lg">
            <summary class="flex items-center justify-between gap-4 cursor-pointer">
                <span class="shrink-0 text-xs text-slate-900 font-semibold">{{displayDate(observation.created)}}</span>
                <span class="max-w-[80%] text-sm text-slate-500 font-normal truncate">{{observation.detail}}</span>
                <span class="shrink-0 justify-self-end  text-xs text-slate-900 font-semibold">By: {{observation.staff_id}}</span>
            </summary>

            <span class="flex flex-col gap-8 mt-4 ml-5">
                <p class="text-slate-500 text-sm font-normal">{{observation.detail}}</p>
            </span>

            <div class="flex justify-end gap-3 border-t pt-4 mt-10">
                <!-- <AppButton data-test="btn-update" @click.prevent :name="'Update'" :type="'plain'" /> -->
                <AppButton data-test="btn-delete" @click.prevent="actionUpdateObservationDelete({open: true, id: observation.id})" :name="'Delete'" :loading="observationDelete.open" :loadingText="'Deleting'" :disabled="observationDelete.open" />
            </div>
        </details>
        
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {DateTime} from "luxon";
import AppButton from "./AppButton.vue";

export default {
    name: "AppObservationCard",
    props: {
        observation: {type: Object, required: false},
    },
    components: {AppButton,},
    methods: {
        ...mapActions([
            "actionUpdateObservationDelete",
        ]),
        displayDate(value) {
            return DateTime.fromISO(value).setLocale("en-US").toLocaleString(DateTime.DATE_MED);
        },
    },
    computed: {
        ...mapState({
            observationDelete: state => state.observationDelete
        })
    },
}
</script>