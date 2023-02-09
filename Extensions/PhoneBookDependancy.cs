using TechTest.PhoneBook.Repositories;

namespace TechTest.PhoneBook.Extensions
{
    /// <summary>
    /// Extension methods for dependancy injection.
    /// </summary>
    public static class PhoneBookDependancy
    {
        /// <summary>
        /// Register dependances for the phone book applicaiton.
        /// </summary>
        /// <param name="services">The <see cref="IServiceCollection"/> to register services to.</param>
        /// <returns>The <paramref name="services"/></returns>
        public static IServiceCollection RegisterPhoneBook(this IServiceCollection services)
        {
            services.AddScoped<IPhoneDataRepository, InMemoryPhoneDataRepository>();

            return services;
        }
    }
}