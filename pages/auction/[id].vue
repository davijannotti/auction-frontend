<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";

const API_URL = "http://127.0.0.1:8000";

const auction = ref(null);
const route = useRoute();
const auctionId = route.params.id;

const showBidDialog = ref(false);
const selectedItem = ref(null);
const bidAmount = ref(0);

const timeRemaining = ref("");
const winner = ref(null);
let ws = null;
let timerInterval = null;

const isAuctionActive = computed(() => auction.value && auction.value.status === 'ATIVO');

const formatTime = (diff) => {
    if (diff <= 0) return "Auction Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

const openBidDialog = (item) => {
    selectedItem.value = item;
    bidAmount.value = parseFloat(item.current_bid) + 1; // Suggest a bid higher than current
    showBidDialog.value = true;
};

const placeBid = async () => {
    if (
        !selectedItem.value ||
        bidAmount.value <= parseFloat(selectedItem.value.current_bid)
    ) {
        alert("Your bid must be higher than the current bid.");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/bids/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                item: selectedItem.value.id,
                amount: bidAmount.value,
            }),
        });

        if (response.ok) {
            alert("Bid placed successfully!");
            const updatedAuctionResponse = await fetch(
                `http://127.0.0.1:8000/api/auctions/${auctionId}/`,
            );
            const updatedAuctionData = await updatedAuctionResponse.json();
            auction.value = updatedAuctionData;
        } else {
            const errorData = await response.json();
            alert(`Failed to place bid: ${JSON.stringify(errorData)}`);
        }
    } catch (error) {
        console.error("Error placing bid:", error);
        alert("An error occurred while placing your bid.");
    } finally {
        showBidDialog.value = false;
    }
};

onMounted(async () => {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/auctions/${auctionId}/`,
        );
        const data = await response.json();
        auction.value = data;

        if (auction.value.status === 'ATIVO') {
            timerInterval = setInterval(() => {
                const endDate = new Date(auction.value.end_time);
                const now = new Date();
                const diff = endDate.getTime() - now.getTime();
                timeRemaining.value = formatTime(diff);
                if (diff <= 0) {
                    clearInterval(timerInterval);
                }
            }, 1000);
        } else {
            timeRemaining.value = `Status: ${auction.value.status}`;
        }

        ws = new WebSocket(`ws://localhost:8000/ws/auctions/${auctionId}/`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'auction.ended') {
                auction.value.status = 'ENCERRADO';
                winner.value = data.message.winner;
                clearInterval(timerInterval);
                timeRemaining.value = "Auction Ended";
            }
        };

    } catch (error) {
        console.error("Error fetching auction details:", error);
    }
});

onUnmounted(() => {
    if (ws) {
        ws.close();
    }
    if (timerInterval) {
        clearInterval(timerInterval);
    }
});

</script>

<template>
    <VCard v-if="auction">
        <VCardTitle class="text-h4 mb-2">{{ auction.name }}</VCardTitle>
        <VCardText>
            <VRow>
                <VCol cols="12" md="6">
                    <VImg
                        v-if="
                            auction.items &&
                            auction.items.length > 0 &&
                            auction.items[0].image
                        "
                        :src="`${API_URL}${auction.items[0].image}`"
                        aspect-ratio="16/9"
                        cover
                        class="rounded-lg"
                    ></VImg>
                    <VImg
                        v-else
                        src="https://via.placeholder.com/400x300?text=No+Image"
                        aspect-ratio="16/9"
                        cover
                        class="rounded-lg"
                    ></VImg>
                </VCol>
                <VCol cols="12" md="6">
                    <p class="text-body-1 mb-4">{{ auction.description }}</p>
                    <div class="d-flex justify-space-between align-center mb-4">
                        <div class="text-h6">Time Remaining:</div>
                        <div class="text-h6 font-weight-bold text-primary">{{ timeRemaining }}</div>
                    </div>
                    <div v-if="auction.status === 'ENCERRADO' && winner" class="mb-4">
                        <VAlert type="success" variant="tonal">
                            Winner: <strong>{{ winner.username }}</strong>
                        </VAlert>
                    </div>
                    <VList lines="two" density="compact">
                        <VListItem
                            v-for="item in auction.items"
                            :key="item.id"
                            class="px-0"
                        >
                            <VListItemTitle
                                class="text-body-1 font-weight-medium"
                            >
                                {{ item.name }}
                            </VListItemTitle>
                            <VListItemSubtitle class="text-caption">
                                {{ item.description }}
                            </VListItemSubtitle>
                            <template #append>
                                <div class="text-right">
                                    <div class="font-weight-bold text-h6">
                                        R$ {{ item.current_bid }}
                                    </div>
                                    <div
                                        class="text-caption text-medium-emphasis"
                                    >
                                        Current Bid
                                    </div>
                                </div>
                            </template>
                            <VCardActions>
                                <VSpacer />
                                <VBtn
                                    color="primary"
                                    @click="openBidDialog(item)"
                                    :disabled="!isAuctionActive"
                                    >Place Bid</VBtn
                                >
                            </VCardActions>
                        </VListItem>
                    </VList>
                </VCol>
            </VRow>
        </VCardText>
    </VCard>
    <VCard v-else>
        <VCardText>Loading auction details...</VCardText>
    </VCard>

    <VDialog v-model="showBidDialog" max-width="500px">
        <VCard>
            <VCardTitle class="headline"
                >Place Bid for {{ selectedItem?.name }}</VCardTitle
            >
            <VCardText>
                <VTextField
                    v-model.number="bidAmount"
                    label="Your Bid"
                    type="number"
                    :min="
                        selectedItem
                            ? parseFloat(selectedItem.current_bid) + 1
                            : 0
                    "
                    step="0.01"
                    outlined
                    dense
                ></VTextField>
            </VCardText>
            <VCardActions>
                <VSpacer></VSpacer>
                <VBtn color="blue darken-1" text @click="showBidDialog = false"
                    >Cancel</VBtn
                >
                <VBtn color="green darken-1" text @click="placeBid"
                    >Place Bid</VBtn
                >
            </VCardActions>
        </VCard>
    </VDialog>
</template>
