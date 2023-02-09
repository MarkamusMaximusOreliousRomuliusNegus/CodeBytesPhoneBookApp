namespace TechTest.PhoneBook.Repositories
{
    using TechTest.PhoneBook.Models;

    /// <summary>
    /// Defines a phone repository.
    /// </summary>
    public interface IPhoneDataRepository
    {
        /// <summary>
        /// Creates an entry in the repository.
        /// </summary>
        /// <param name="item">The item to create.</param>
        /// <returns>The created item.</returns>
        PhoneBookItem Create(PhoneBookItem item);

        /// <summary>
        /// Deletes an item in the repository.
        /// </summary>
        /// <param name="item">The item to delete.</param>
        void Delete(PhoneBookItem item);

        /// <summary>
        /// Reads a data from a repositiory.
        /// </summary>
        /// <param name="lastNameFilter">The last name filter to use on the query.</param>
        /// <returns>A collection of data.</returns>
        IEnumerable<PhoneBookItem> Read(string? lastNameFilter);

        /// <summary>
        /// Updates an item in the repository.
        /// </summary>
        /// <param name="item">The item to update.</param>
        void Update(PhoneBookItem item);
    }
}