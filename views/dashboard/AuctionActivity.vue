<script setup lang="ts">
import { ref, onMounted } from "vue";

const statistics = ref([]);
const isLoading = ref(true);

onMounted(async () => {
    // TODO: Replace with actual API call
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
    <VCard class="w-100 h-40" title="Auction Activity">
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
    </VCard>
</template>
