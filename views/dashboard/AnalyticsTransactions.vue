<script setup lang="ts">
import { ref, onMounted } from 'vue'

const statistics = ref([])

onMounted(async () => {
  // TODO: Replace with actual API call
  const response = await new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          title: 'Active Bids',
          stats: '12',
          icon: 'ri-auction-line',
          color: 'primary',
        },
        {
          title: 'Auctions Won',
          stats: '3',
          icon: 'ri-trophy-line',
          color: 'success',
        },
        {
          title: 'Total Spent',
          stats: '$1,245',
          icon: 'ri-money-dollar-circle-line',
          color: 'info',
        },
        {
          title: 'Watching',
          stats: '27',
          icon: 'ri-eye-line',
          color: 'warning',
        },
      ])
    }, 1000)
  })
  statistics.value = response
})

const moreList = [
  { title: 'Share', value: 'Share' },
  { title: 'Refresh', value: 'Refresh' },
  { title: 'Update', value: 'Update' },
]
</script>

<template>
  <VCard title="Auction Activity">
    <template #subtitle>
      <p class="text-body-1 mb-0">
        <span class="d-inline-block font-weight-medium text-high-emphasis">Total 48.5% Growth</span> <span class="text-high-emphasis">😎</span> this month
      </p>
    </template>

    <template #append>
      <MoreBtn :menu-list="moreList" />
    </template>

    <VCardText class="pt-10">
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.title"
          cols="12"
          sm="6"
          md="3"
        >
          <div class="d-flex align-center gap-x-3">
            <VAvatar
              :color="item.color"
              rounded
              size="40"
              class="elevation-2"
            >
              <VIcon
                size="24"
                :icon="item.icon"
              />
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
