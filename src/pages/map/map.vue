<template>
    <div class="map">
        <div id="container"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            longitude:0,
            latitude:0,
        }
    },
    mounted() {
        this.longitude = this.$route.query.longitude
        this.latitude = this.$route.query.latitude
        this.init()
    },
    methods: {
        init() {
            var center = new qq.maps.LatLng(this.latitude,this.longitude);
            var map = new qq.maps.Map(document.getElementById('container'), {
                center: center,
                zoom: 13
            });
            //创建marker
            var marker = new qq.maps.Marker({
                position: center,
                map: map
            });
        }
    }
}
</script>
<style lang="scss">
.map {
    height: 100%;
}
#container {
    width: 100%;
    height: 100%;
}
</style>