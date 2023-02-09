using TechTest.PhoneBook.Models;

namespace TechTest.PhoneBook.Repositories
{
    /// <summary>
    /// Place holder repository to represent a database. This is here due to time constrains.
    /// </summary>
    public class InMemoryPhoneDataRepository : IPhoneDataRepository
    {
        #region Fields

        /// <summary>
        /// The in memory list to use.
        /// </summary>
        private static readonly List<PhoneBookItem> InMemeoryList = new()
        {
            new PhoneBookItem() { Id = 1, Name = "Item 1", Msisdn = "00012345678" },
            new PhoneBookItem() { Id = 2, Name = "Item 2", Msisdn = "00098765431" },
            new PhoneBookItem() { Id = 3, Name = "Item 3", Msisdn = "000456789123" }
        };

        /// <summary>
        /// Identifier to keep track of the id.
        /// </summary>
        /// <remarks>This may be subject to race conditions but this is proof of concept.</remarks>
        private int Identity = InMemeoryList.Count + 1;

        #endregion Fields

        #region Constructors

        /// <summary>
        /// Initialises a new instance of the <see cref="InMemoryPhoneDataRepository"/> class.
        /// </summary>
        public InMemoryPhoneDataRepository()
        {
        }

        #endregion Constructors

        #region Public methods

        /// <summary>
        /// Creates an entry in the repository.
        /// </summary>
        /// <param name="item">The item to create.</param>
        /// <returns>The created item.</returns>
        public PhoneBookItem Create(PhoneBookItem item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item));

            int newID = Identity++;
            item.Id = newID;

            InMemeoryList.Add(item);

            return item;
        }

        /// <summary>
        /// Deletes an item in the repository.
        /// </summary>
        /// <param name="item">The item to delete.</param>
        public void Delete(PhoneBookItem item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item));

            // find the match entry by id
            PhoneBookItem? entry = InMemeoryList.Find(a => a.Id == item.Id);

            // remove the entry
            if (entry != null)
            {
                InMemeoryList.Remove(entry);
            }
        }

        /// <summary>
        /// Reads a data from a repositiory.
        /// </summary>
        /// <param name="filterData">The filter data to use on the query.</param>
        /// <returns>A collection of data.</returns>
        public IEnumerable<PhoneBookItem> Read(string? lastNameFilter)
        {
            /* if no filter data just return all values
             * else apply the filter. */
            if (string.IsNullOrEmpty(lastNameFilter))
            {
                return InMemeoryList.ToArray();
            }
            else
            {
                IEnumerable<PhoneBookItem> data =
                    from a in InMemeoryList
                    where a.Name != null && a.Name.Contains(lastNameFilter, StringComparison.OrdinalIgnoreCase)
                    select a;

                return data.ToArray();
            }
        }

        /// <summary>
        /// Updates an item in the repository.
        /// </summary>
        /// <param name="item">The item to update.</param>
        public void Update(PhoneBookItem item)
        {
            if (item == null)
                throw new ArgumentNullException(nameof(item));

            if (InMemeoryList.Count == 0)
                return;

            // get entry
            PhoneBookItem? entry = InMemeoryList.FirstOrDefault(a => a.Id == item.Id);

            // update entry
            if (entry != null)
            {
                entry.Msisdn = item.Msisdn;
                entry.Name = item.Name;
            }
        }

        #endregion Public methods
    }
}