<script setup lang="ts">
import trophy from "@images/misc/trophy.png";
import { ref, onMounted } from "vue";

interface BidderRanking {
    id: number;
    name: string;
    avatar?: string;
    auctionsWon: number;
    totalValue: number;
    winRate: number;
}

const topBidders = ref<BidderRanking[]>([]);
const isLoading = ref(true);

// Mock data - replace with actual API call
const fetchTopBidders = async () => {
    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        topBidders.value = [
            {
                id: 1,
                name: "John Smith",
                avatar: "https://ui-avatars.com/api/?name=John+Smith&background=7367F0&color=fff",
                auctionsWon: 23,
                totalValue: 42800,
                winRate: 78,
            },
            {
                id: 2,
                name: "Sarah Johnson",
                avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=28C76F&color=fff",
                auctionsWon: 18,
                totalValue: 35200,
                winRate: 65,
            },
            {
                id: 3,
                name: "Mike Wilson",
                avatar: "https://ui-avatars.com/api/?name=Mike+Wilson&background=FF9F43&color=fff",
                auctionsWon: 15,
                totalValue: 28900,
                winRate: 58,
            },
            {
                id: 4,
                name: "Mike Wilson",
                avatar: "https://ui-avatars.com/api/?name=Mike+Wilson&background=FF9F43&color=fff",
                auctionsWon: 15,
                totalValue: 28900,
                winRate: 58,
            },
            {
                id: 5,
                name: "Mike Wilson",
                avatar: "https://ui-avatars.com/api/?name=Mike+Wilson&background=FF9F43&color=fff",
                auctionsWon: 15,
                totalValue: 28900,
                winRate: 58,
            },
            {
                id: 6,
                name: "Mike Wilson",
                avatar: "https://ui-avatars.com/api/?name=Mike+Wilson&background=FF9F43&color=fff",
                auctionsWon: 15,
                totalValue: 28900,
                winRate: 58,
            },
            {
                id: 7,
                name: "Mike Wilson",
                avatar: "https://ui-avatars.com/api/?name=Mike+Wilson&background=FF9F43&color=fff",
                auctionsWon: 15,
                totalValue: 28900,
                winRate: 58,
            },
            {
                id: 8,
                name: "Mike Wilson",
                avatar: "https://ui-avatars.com/api/?name=Mike+Wilson&background=FF9F43&color=fff",
                auctionsWon: 15,
                totalValue: 28900,
                winRate: 58,
            },
            {
                id: 9,
                name: "Mike Wilson",
                avatar: "https://ui-avatars.com/api/?name=Mike+Wilson&background=FF9F43&color=fff",
                auctionsWon: 15,
                totalValue: 28900,
                winRate: 58,
            },
            {
                id: 10,
                name: "Mike Wilson",
                avatar: "https://ui-avatars.com/api/?name=Mike+Wilson&background=FF9F43&color=fff",
                auctionsWon: 15,
                totalValue: 28900,
                winRate: 58,
            },
        ];
    } catch (error) {
        console.error("Error fetching bidders ranking:", error);
    } finally {
        isLoading.value = false;
    }
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    }).format(value);
};

const getRankIcon = (index: number) => {
    switch (index) {
        case 0:
            return "🥇";
        case 1:
            return "🥈";
        case 2:
            return "🥉";
        default:
            return `#${index + 1}`;
    }
};

onMounted(() => {
    fetchTopBidders();
});
</script>

<template>
    <VCard class="position-relative">
        <VCardText class="pa-4">
            <div class="d-flex align-center justify-space-between mb-3">
                <div>
                    <h6 class="text-h5 mb-1">Top Bidders Ranking 🏆</h6>
                </div>
                <VBtn variant="outlined" size="small" color="primary">
                    View All
                </VBtn>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="text-center py-6">
                <VProgressCircular indeterminate color="primary" size="28" />
                <div class="text-caption text-medium-emphasis mt-2">
                    Loading rankings...
                </div>
            </div>

            <!-- Bidders List -->
            <div v-else class="bidders-list">
                <div
                    v-for="(bidder, index) in topBidders"
                    :key="bidder.id"
                    class="bidder-item d-flex align-center mb-2"
                    :class="{ 'top-bidder': index === 0 }"
                >
                    <!-- Rank -->
                    <div class="rank-badge me-2">
                        <span v-if="index < 3" class="rank-icon">
                            {{ getRankIcon(index) }}
                        </span>
                        <VChip
                            v-else
                            size="small"
                            color="default"
                            variant="outlined"
                        >
                            #{{ index + 1 }}
                        </VChip>
                    </div>

                    <!-- Avatar -->
                    <VAvatar
                        :image="bidder.avatar"
                        :size="index === 0 ? 36 : 32"
                        class="me-3"
                    />

                    <!-- Bidder Info -->
                    <div class="flex-grow-1">
                        <div
                            class="d-flex align-center justify-space-between mb-1"
                        >
                            <div class="text-body-1 font-weight-medium">
                                {{ bidder.name }}
                                <VIcon
                                    v-if="index === 0"
                                    icon="mdi-crown"
                                    color="warning"
                                    size="16"
                                    class="ms-1"
                                />
                            </div>
                            <div
                                class="text-body-1 text-primary font-weight-bold"
                            >
                                {{ formatCurrency(bidder.totalValue) }}
                            </div>
                        </div>

                        <div class="d-flex align-center justify-space-between">
                            <div class="text-caption text-medium-emphasis">
                                {{ bidder.auctionsWon }} auctions won
                            </div>
                            <div class="d-flex align-center">
                                <VChip
                                    :color="
                                        bidder.winRate >= 70
                                            ? 'success'
                                            : bidder.winRate >= 50
                                              ? 'warning'
                                              : 'error'
                                    "
                                    variant="tonal"
                                    size="x-small"
                                    class="text-caption"
                                >
                                    {{ bidder.winRate }}% win rate
                                </VChip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </VCardText>
    </VCard>
</template>

<style lang="scss" scoped>
.v-card {
    .trophy-bg {
        position: absolute;
        inline-size: 3rem;
        inset-block-end: 0.5rem;
        inset-inline-end: 0.5rem;
        opacity: 0.1;
        z-index: 0;
    }

    .v-card-text {
        position: relative;
        z-index: 1;
    }
}

.bidders-list {
    .bidder-item {
        padding: 10px;
        border-radius: 6px;
        transition: all 0.2s ease;

        &:hover {
            background-color: rgba(var(--v-theme-primary), 0.04);
            transform: translateY(-1px);
        }

        &.top-bidder {
            background: linear-gradient(
                135deg,
                rgba(var(--v-theme-primary), 0.08) 0%,
                rgba(var(--v-theme-success), 0.04) 100%
            );
            border: 1px solid rgba(var(--v-theme-primary), 0.12);

            .v-avatar {
                border: 2px solid rgb(var(--v-theme-primary));
            }
        }
    }

    .rank-badge {
        min-width: 32px;
        display: flex;
        justify-content: center;

        .rank-icon {
            font-size: 1.2rem;
            line-height: 1;
        }
    }
}

// Responsive adjustments
@media (max-width: 600px) {
    .bidder-item {
        .text-body-1 {
            font-size: 0.85rem !important;
        }

        .v-avatar {
            --v-avatar-size: 28px !important;
        }
    }
}
</style>
