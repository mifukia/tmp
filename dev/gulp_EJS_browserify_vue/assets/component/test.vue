<template>
<div>
    <p v-if="isVisible">
        {{message}}
    </p>
    </div>
</template>

<style scoped>
    div{
        font-size: 20px;
        color: red;
        padding: 20px;
        background: pink;
    }
</style>

<script>
export default {
    data: function() {
        return {
            message: 'コンポーネント'
        }
    },
    computed: {
        isVisible: function() {
            if (this.message) {
                return true;
            } else {
                return false;
            }
        }
    }
}
</script>




