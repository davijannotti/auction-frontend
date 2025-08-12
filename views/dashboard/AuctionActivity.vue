<script setup lang="ts">
import { ref, onMounted } from "vue";

const statistics = ref([]);
const header = ref<HeaderItem[]>([]);
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
    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/users/4/statistics/",
        );
        const data = await response.json();
        statistics.value = data;

        const bids = statistics.value.bids?.length || 0;
        const auctions_won = statistics.value.auctions_won?.length || 0;
        const auctions_lost = statistics.value.auctions_lost?.length || 0;
        const win_rate =
            bids > 0 ? ((auctions_won / bids) * 100).toFixed(2) + "%" : "100%";

        header.value = [
            {
                title: "Active Bids",
                stats: bids,
                icon: "ri-auction-line",
                color: "primary",
            },
            {
                title: "Auctions Won",
                stats: auctions_won,
                icon: "ri-trophy-line",
                color: "success",
            },
            {
                title: "Auctions Lost",
                stats: auctions_lost,
                icon: "ri-trophy-line",
                color: "error",
            },
            {
                title: "Win Rate",
                stats: win_rate,
                icon: "ri-bar-chart-line",
                color: "error",
            },
            {
                title: "Total Spent",
                stats: (
                    statistics.value.auctions_won?.reduce(
                        (sum, item) => sum + parseFloat(item.current_bid),
                        0,
                    ) || 0
                ).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                }),
                icon: "ri-money-dollar-circle-line",
                color: "info",
            },
        ];

        isLoading.value = false;
    } catch (error) {
        console.error("Error fetching auctions:", error);
    }
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
                    v-for="item in header"
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
