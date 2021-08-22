<template>
    <main>
        <button @click=start()>Start Game</button>
    </main>
</template>

<script>
export default {
    methods: {
        start() {
            this.$store.dispatch(('fetchCategories'))
            this.$router.push("/config")
        }
    }
}
</script>
