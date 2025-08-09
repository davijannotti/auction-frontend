<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const auction = ref(null);
const bidAmount = ref({});

onMounted(async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${route.params.id}/`);
    const data = await response.json();
    auction.value = data;
    // Initialize bid amounts for each item
    if (data.items) {
      data.items.forEach(item => {
        bidAmount.value[item.id] = null;
      });
    }
  } catch (error) {
    console.error('Error fetching auction details:', error);
  }
});

const getStatusColor = (status: string) => {
  if (status === 'ATIVO') return 'success';
  if (status === 'AGUARDANDO') return 'warning';
  return 'secondary';
};

const placeBid = async (itemId: number) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Handle case where user is not authenticated
    console.error('User not authenticated');
    return;
  }

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/bids/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        item: itemId,
        amount: bidAmount.value[itemId],
      }),
    });
    if (response.ok) {
      // Handle successful bid
      console.log(`Bid placed successfully for item ${itemId}`);
      // You might want to refresh the auction data here
    } else {
      // Handle error
      console.error(`Error placing bid for item ${itemId}`);
    }
  } catch (error) {
    console.error('Error placing bid:', error);
  }
};
</script>

<template>
  <div v-if="auction">
    <VCard>
      <VCardItem>
        <VCardTitle>{{ auction.name }}</VCardTitle>
        <template #append>
          <VChip :color="getStatusColor(auction.status)" size="small" class="text-capitalize">
            {{ auction.status }}
          </VChip>
        </template>
      </VCardItem>
      <VCardText>
        <p>End Time: {{ new Date(auction.end_time).toLocaleString() }}</p>
      </VCardText>
    </VCard>

    <VRow class="mt-4">
      <VCol v-for="item in auction.items" :key="item.id" cols="12" md="6" lg="4">
        <VCard>
          <VImg :src="item.image || '/assets/images/eCommerce/2.png'" :alt="item.name" />
          <VCardItem>
            <VCardTitle>{{ item.name }}</VCardTitle>
          </VCardItem>
          <VCardText>
            <p>{{ item.description }}</p>
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="font-weight-bold">R$ {{ item.current_bid }}</div>
                <div class="text-sm">Lance Atual</div>
              </div>
            </div>
          </VCardText>
          <VCardActions>
            <VForm @submit.prevent="placeBid(item.id)">
              <VTextField
                v-model="bidAmount[item.id]"
                label="Your bid"
                type="number"
                :rules="[v => !!v || 'Bid amount is required']"
                required
              />
              <VBtn type="submit" color="primary">Place Bid</VBtn>
            </VForm>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </div>
  <div v-else>
    <p>Loading auction details...</p>
  </div>
</template>