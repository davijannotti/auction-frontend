<script setup lang="ts">
import { ref, onMounted } from "vue";

const statistics = ref([]);
const isLoading = ref(true);

const lineChartOptions = ref({
    chart: {
        type: "line",
        toolbar: { show: true },
        zoom: { enabled: false },
        sparkline: { enabled: false }, // Para mostrar grid e labels melhor, desabilitei sparkline
    },
    stroke: {
        curve: "smooth",
        width: 3,
    },
    markers: {
        size: 5,
    },
    xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        labels: {
            show: true,
            style: {
                fontSize: "13px",
                colors: "#555",
            },
        },
        title: {
            text: "Days of the Week",
            style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#777",
            },
        },
    },
    yaxis: {
        show: true,
        labels: {
            style: {
                fontSize: "13px",
                colors: "#555",
            },
        },
        title: {
            text: "Number of Bids",
            style: {
                fontSize: "14px",
                fontWeight: "bold",
                color: "#777",
            },
        },
    },
    colors: ["#9155FD"],
    grid: {
        show: true,
        borderColor: "#eee",
        strokeDashArray: 4,
    },
    dataLabels: {
        enabled: true,
        style: {
            fontSize: "12px",
            colors: ["#9155FD"],
        },
    },
    tooltip: {
        enabled: true,
        theme: "light",
        x: {
            show: true,
        },
    },
    legend: {
        show: true,
        position: "top",
    },
});

const lineChartSeries = ref([
    {
        name: "Bids",
        data: [10, 15, 8, 12, 20, 18, 14],
    },
]);

onMounted(async () => {
    const response = await new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    title: "Active Bids",
                    stats: "12",
                    icon: "ri-auction-line",
                    color: "primary",
                },
                {
                    title: "Auctions Won",
                    stats: "3",
                    icon: "ri-trophy-line",
                    color: "success",
                },
                {
                    title: "Auctions Lost",
                    stats: "2",
                    icon: "ri-trophy-line",
                    color: "error",
                },
                {
                    title: "Win Rate",
                    stats: "23%",
                    icon: "ri-bar-chart-line",
                    color: "error",
                },
                {
                    title: "Total Spent",
                    stats: "$1,245",
                    icon: "ri-money-dollar-circle-line",
                    color: "info",
                },
            ]);
        }, 1000);
    });
    statistics.value = response;
    isLoading.value = false;
});

const moreList = [
    { title: "Share", value: "Share" },
    { title: "Refresh", value: "Refresh" },
    { title: "Update", value: "Update" },
];
</script>

<template>
    <VCard title="Auction Activity">
        <!-- Loading State -->
        <div v-if="isLoading" class="text-center py-6">
            <VProgressCircular indeterminate color="primary" size="28" />
            <div class="text-caption text-medium-emphasis mt-2">
                Loading activity...
            </div>
        </div>

        <template #append>
            <MoreBtn :menu-list="moreList" />
        </template>

        <VCardText>
            <VRow no-gutters>
                <VCol
                    v-for="item in statistics"
                    :key="item.title"
                    cols="12"
                    sm="6"
                    md="2"
                >
                    <div class="d-flex align-center gap-x-3">
                        <VAvatar
                            :color="item.color"
                            rounded
                            size="40"
                            class="elevation-2"
                        >
                            <VIcon size="24" :icon="item.icon" />
                        </VAvatar>

                        <div class="d-flex flex-column">
                            <div class="text-body-1">
                                {{ item.title }}
                            </div>
                            <h5 class="text-h5">
                                {{ item.stats }}
                            </h5>
                        </div>
                    </div>
                </VCol>
            </VRow>
        </VCardText>

        <VueApexCharts
            type="line"
            :options="lineChartOptions"
            :series="lineChartSeries"
            :height="180"
        />
    </VCard>
</template>
