<script setup lang="ts">
import Ranking from "@/views/dashboard/Ranking.vue";
import AnalyticsDepositWithdraw from "@/views/dashboard/AnalyticsDepositWithdraw.vue";
import AnalyticsSalesByCountries from "@/views/dashboard/AnalyticsSalesByCountries.vue";
import AuctionActivity from "@/views/dashboard/AuctionActivity.vue";
import AnalyticsUserTable from "@/views/dashboard/AnalyticsUserTable.vue";
import WeeklyOverview from "@/views/dashboard/WeeklyOverview.vue";
</script>

<template>
    <VRow class="match-height">
        <VCol cols="12" md="4">
            <Ranking />
        </VCol>

        <VCol cols="12" md="8">
            <AuctionActivity />
        </VCol>

        <VCol cols="12" md="4">
            <WeeklyOverview />
        </VCol>

        <VCol cols="12" md="4">
            <AnalyticsSalesByCountries />
        </VCol>

        <VCol cols="12" md="8">
            <AnalyticsDepositWithdraw />
        </VCol>

        <VCol cols="12">
            <AnalyticsUserTable />
        </VCol>
    </VRow>
</template>
