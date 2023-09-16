<template>
    <Transition name="modal-outer">
        <div v-show="modalActive" class="absolute top-20 -left-1/4 flex px-8 z-10">
            <Transition name="modal-inner">
            <div v-if="modalActive" class="p-5 self-start rounded-xl bg-weather-tertiary shadow-md bg-opacity-50">
                    <slot/>
                    <button @click="$emit('close-modal')" class="text-white mt-8 px-6 py-2 rounded-md hover:bg-weather-secondary duration-150 bg-weather-primary ">Close</button>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup>
defineEmits(['close-modal']);
defineProps({
    modalActive:{
        type:Boolean,
        defaut:false
    }
});

</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active{
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to{
    opacity: 0 ;
}

.modal-inner-enter-active{
    transition: all 0.3s;
}

.modal-inner-leave-active{
    transition: all 0.3s;
}

.modal-inner-enter-from{
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to{
    transform: scale(0.8);
}

</style>