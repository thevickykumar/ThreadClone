import hashlib
import time

class Block:
    def __init__(self, previous_block_hash, transactions):
        self.version = 1
        self.previous_block_hash = previous_block_hash
        self.merkle_root = self.calculate_merkle_root(transactions)
        self.timestamp = int(time.time())  # Current timestamp
        self.nonce = 0
        self.transactions = transactions
        self.block_hash = self.calculate_block_hash()

    def calculate_merkle_root(self, transactions):
        # Simplified merkle root calculation for demonstration purposes
        # In a real implementation, you would create a proper Merkle tree
        concatenated_transactions = ''.join(str(transaction) for transaction in transactions)
        return hashlib.sha256(concatenated_transactions.encode()).hexdigest()

    def calculate_block_hash(self):
        header_data = (
            str(self.version) +
            self.previous_block_hash +
            self.merkle_root +
            str(self.timestamp) +
            str(self.nonce)
        )
        return hashlib.sha256(header_data.encode()).hexdigest()

def main():
    previous_block_hash = "00000000000000000000000000000000"  # Genesis block has no previous hash
    transactions = [
       ['A send Rs 500 to B', 'B send rs 700 to C', 'C send rs 899 to D', 'D send rs 999 to E', 'E send rs 1999 to H'],
        ['A send Rs 500 to V', 'B send rs 700 to D', 'C send rs 899 to Q', 'D send rs 999 to P', 'E send rs 1999 to R'],
        ['A send Rs 500 to N', 'B send rs 700 to U', 'C send rs 899 to W', 'D send rs 999 to L', 'E send rs 1999 to Y'],
        ['A send Rs 500 to M', 'B send rs 700 to I', 'C send rs 899 to E', 'D send rs 999 to J', 'E send rs 1999 to Z'],
        ['A send Rs 500 to K', 'B send rs 700 to O', 'C send rs 899 to Y', 'D send rs 999 to O', 'E send rs 1999 to X']
    ]

    block = Block(previous_block_hash, transactions)

    print("Block Version:", block.version)
    print("Previous Block Hash:", block.previous_block_hash)
    print("Merkle Root:", block.merkle_root)
    print("Timestamp:", block.timestamp)
    print("Nonce:", block.nonce)
    print("Transactions:", block.transactions)
    print("Block Hash:", block.block_hash)

if __name__ == "__main__":
    main()
